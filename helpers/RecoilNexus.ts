/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/ban-ts-comment */
/**
 * Source: https://github.com/luisanton-io/recoil-nexus
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RecoilState, RecoilValue, useRecoilCallback } from 'recoil'

interface Nexus {
	get?: <T>(atom: RecoilValue<T>) => T
	getPromise?: <T>(atom: RecoilValue<T>) => Promise<T>
	set?: <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void
	reset?: (atom: RecoilState<any>) => void
}

const nexus: Nexus = {}

export default function RecoilNexus() {
	nexus.get = useRecoilCallback<[atom: RecoilValue<any>], any>(
		({ snapshot }) =>
			<T>(atom: RecoilValue<T>) =>
				snapshot.getLoadable(atom).contents,
		[]
	)

	nexus.getPromise = useRecoilCallback<[atom: RecoilValue<any>], Promise<any>>(
		({ snapshot }) =>
			<T>(atom: RecoilValue<T>) =>
				snapshot.getPromise(atom),
		[]
	)

	// @ts-ignore
	nexus.set = useRecoilCallback(({ set }) => set, [])
	nexus.reset = useRecoilCallback(({ reset }) => reset, [])

	return null
}

export function getRecoil<T>(atom: RecoilValue<T>): T {
	if (!nexus.get) return undefined as unknown as T
	return nexus.get(atom)
}

export function getRecoilPromise<T>(atom: RecoilValue<T>): Promise<T> {
	if (!nexus.getPromise) return new Promise(() => {})
	return nexus.getPromise(atom)
}

export function setRecoil<T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
	if (!nexus.set) return
	nexus.set(atom, valOrUpdater)
}

export function resetRecoil(atom: RecoilState<any>) {
	if (!nexus.reset) return
	nexus.reset(atom)
}
