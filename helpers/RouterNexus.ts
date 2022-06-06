import { NextRouter, useRouter } from 'next/router'

interface Nexus {
	get?: NextRouter
}

const nexus: Nexus = {}

export default function RouterNexus() {
	nexus.get = useRouter()
	return null
}

export function getRouter() {
	return nexus.get
}
