import { SomeObject } from '@interfaces/SomeObject'
import {
	atom,
	atomFamily,
	DefaultValue,
	selector,
	selectorFamily,
	SerializableParam,
	waitForAll,
} from 'recoil'

export interface FormAtomGeneratorOptions<T> {
	onUpdate?: (newValue?: T | T[keyof T] | DefaultValue) => void
}

export default function FormAtomGenerator<T>(
	name: string,
	initialValue: T,
	options: FormAtomGeneratorOptions<T> = {}
) {
	const { onUpdate } = options
	const formsAtomKey = `formsAtom__${name}`
	const formDataAtomKey = `formDataAtom__${name}`
	const formDataUpdaterKey = `formDataSelector__${name}`
	const formAtomUpdaterKey = `formAtomUpdater__${name}`

	/**
	 * Store values independently
	 */
	const formsAtom = atomFamily<T[keyof T], SerializableParam>({
		key: formsAtomKey,
		default: param => initialValue[param as keyof T],
	})

	/**
	 * Clone all value and store them in one place
	 */
	const formDataAtom = atom<T>({
		key: formDataAtomKey,
		default: initialValue,
	})

	const formDataUpdater = selector<T>({
		key: formDataUpdaterKey,
		get: ({ get }) => get(formDataAtom),
		set: ({ set, get, reset }, newValue) => {
			Object.keys({ ...newValue, ...get(formDataAtom) }).forEach(id => {
				if (newValue instanceof DefaultValue) {
					reset(formsAtom(id))
					return
				}
				set(formsAtom(id), newValue[id as keyof typeof newValue])
			})
			if (newValue instanceof DefaultValue) {
				reset(formDataAtom)
			} else {
				set(formDataAtom, newValue)
			}
			if (onUpdate) onUpdate(newValue)
		},
	})

	/**
	 * Update formDataAtom completely
	 * first call  {x: text}
	 * second call {y: text}
	 * ===>
	 * {y: text}
	 */

	const formAtomUpdater = selectorFamily<T[keyof T], SerializableParam>({
		key: formAtomUpdaterKey,
		get:
			id =>
			({ get }) => {
				if (Array.isArray(id)) {
					return get(waitForAll(id.map(i => formsAtom(i))))
						.filter(i => !!i)
						.at(-1) as T[keyof T]
				}
				return get(formsAtom(id))
			},
		set:
			id =>
			({ set, reset }, value) => {
				if (value instanceof DefaultValue) {
					reset(formsAtom(id))
					set(formDataAtom, prev => {
						const newValue = { ...prev }
						delete newValue[id as keyof T]
						if (onUpdate) onUpdate(newValue)
						return {
							...newValue,
						}
					})
					return
				}

				if (Array.isArray(id)) {
					const batchSet: SomeObject = {}
					id.forEach(i => {
						batchSet[i] = value
						set(formsAtom(i), value)
					})

					set(formDataAtom, prev => ({
						...prev,
						...batchSet,
					}))
				} else {
					set(formsAtom(id), value)
					set(formDataAtom, prev => ({
						...prev,
						[id as string | symbol | number]: value,
					}))
				}

				if (onUpdate) onUpdate(value)
			},
	})

	return {
		DataUpdater: formDataUpdater,
		AtomUpdater: formAtomUpdater,
	}
}
