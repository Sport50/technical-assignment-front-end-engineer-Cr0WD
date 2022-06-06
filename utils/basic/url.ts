import trimUrlSlashes from '@utils/basic/trimUrlSlashes'
import { BASE_PATH, HOSTNAME } from '@constants/envs'

const url = (path: string) => trimUrlSlashes(`${BASE_PATH ?? '/'}${path}`)
export const absolute = (path: string) => trimUrlSlashes(`${HOSTNAME ?? ''}${url(path)}`)

export default url
