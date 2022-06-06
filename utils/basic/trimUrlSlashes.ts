const trimUrlSlashes = (string: string) => string.replace(/([^:]\/)\/+/g, '$1')
export default trimUrlSlashes
