function CoverLangCodeToLangString(langCode: number): string {
  const langMap: Record<number, string> = {
    0: 'zh',
    1: 'en',
    2: 'jp',
  }

  // 确保返回值是合法的语言代码字符串或空字符串
  return langMap[langCode] ?? ''
}

function CoverLangStringToLangCode(langString: string): number {
  const langMap: Record<string, number> = {
    ZH: 0,
    EN: 1,
    JP: 2,
  }
  return langMap[langString] ?? -1
}

function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }
      return [err, undefined]
    })
}

class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError' // 自定义错误名称
    this.status = status // HTTP 状态码
  }
}

function parseRouteParams() {
  return {
    page: Number(route.params.page) || 1,
    tag: route.params.tagname || '',
  }
}
export { CoverLangCodeToLangString, CoverLangStringToLangCode, to, HttpError }
