import type { FetchResult, Response as MyResponse } from '@/types/response_types'
import { HttpError, to } from '@/utils'

const apiOrigin = import.meta.env.VITE_API_ORIGIN

const fetchArticleUsePageWithLang = async <T>(
  pageNum: number,
  size: number,
  langString: string,
): Promise<FetchResult<T>> => {
  const params = new URLSearchParams({
    page: pageNum.toString(),
    size: size.toString(),
    lang: langString,
  })
  // 使用 to 来处理 fetch 调用的错误
  const [err, res] = await to(
    fetch(`${apiOrigin}/article?${params}`, {
      method: 'GET',
      mode: 'cors',
    }),
  )

  if (err) {
    return [err, null]
  }

  if (!res?.ok) {
    const error = new Error(`HTTP error! Status: ${res?.status}`)
    return [error, null]
  }

  const [jsonErr, jsonData] = await to(res.json() as Promise<MyResponse<T>>)

  if (jsonErr) {
    return [jsonErr, null]
  }

  if (jsonData.code !== 200) {
    const error = new Error(`Failed to parse response to JSON: ${jsonData.code}`)
    return [error, null]
  }

  return [null, jsonData.body]
}

const fetchArticleCountInfo = async <T>(langString: string): Promise<FetchResult<T>> => {
  const params = new URLSearchParams({
    lang: langString,
  })
  const [err, res] = await to(
    fetch(`${apiOrigin}/article/info?${params}`, {
      method: 'GET',
      mode: 'cors',
    }),
  )
  if (err) {
    return [err, null]
  }

  if (!res?.ok) {
    const error = new Error(`HTTP error! Status: ${res?.status}`)
    return [error, null]
  }

  const [jsonErr, jsonData] = await to(res.json() as Promise<MyResponse<T>>)

  if (jsonErr) {
    return [jsonErr, null]
  }

  if (jsonData.code !== 200) {
    const error = new Error(`Failed to parse response to JSON: ${jsonData.code}`)
    return [error, null]
  }

  return [null, jsonData.body]
}

const fetchArticleUsePageWithLangAndTag = async <T>(
  pageNum: number,
  size: number,
  langString: string,
  tag: string,
): Promise<FetchResult<T>> => {
  const params = new URLSearchParams({
    page: pageNum.toString(),
    size: size.toString(),
    lang: langString,
    tag: tag,
  })
  const [err, res] = await to(
    fetch(`${apiOrigin}/article?${params}`, {
      method: 'GET',
      mode: 'cors',
    }),
  )

  if (err) {
    return [err, null]
  }

  if (!res?.ok) {
    const error = new HttpError('Not Found', 404)
    return [error, null]
  }

  const [jsonErr, jsonData] = await to(res.json() as Promise<MyResponse<T>>)

  if (jsonErr) {
    return [jsonErr, null]
  }

  if (jsonData.code !== 200) {
    const error = new Error(`Failed to parse response to JSON: ${jsonData.code}`)
    return [error, null]
  }

  return [null, jsonData.body]
}

const fetchArticleUseIdWithLang = async <T>(
  id: number,
  langString: string,
): Promise<FetchResult<T>> => {
  const [err, res] = await to(
    fetch(`${apiOrigin}/article/${langString.toLowerCase()}/${id}`, {
      method: 'GET',
      mode: 'cors',
    }),
  )

  if (err) {
    return [err, null]
  }

  if (!res?.ok) {
    const error = new HttpError('Not Found!', res.status)
    return [error, null]
  }
  const [jsonErr, jsonData] = await to(res.json() as Promise<MyResponse<T>>)

  if (jsonErr) {
    return [jsonErr, null]
  }

  if (jsonData.code !== 200) {
    const error = new Error(`Failed to parse response to JSON: ${jsonData.code}`)
    return [error, null]
  }
  return [null, jsonData.body]
}
export {
  fetchArticleUsePageWithLang,
  fetchArticleCountInfo,
  fetchArticleUsePageWithLangAndTag,
  fetchArticleUseIdWithLang,
}
