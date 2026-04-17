export const base64Interceptor: HttpInterceptorFn = (req, next) => {
  const encodedReq = encodeRequest(req);

  return next(encodedReq).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse && typeof event.body === 'string') {
