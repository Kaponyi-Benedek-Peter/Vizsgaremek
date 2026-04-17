import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const base64Interceptor: HttpInterceptorFn = (req, next) => {
  const encodedReq = encodeRequest(req);

  return next(encodedReq).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse && typeof event.body === 'string') {
        try {
          const decoded = decodeURIComponent(escape(atob(event.body)));
          return event.clone({ body: JSON.parse(decoded) });
        } catch {
          return event;
        }
      }
      return event;
    }),
  );
};

function encodeRequest(req: HttpRequest<unknown>): HttpRequest<unknown> {
  const body = req.body;

  if (body === null || body === undefined || body instanceof FormData || body instanceof Blob) {
    return req;
  }

  const json = JSON.stringify(body);
  const encoded = btoa(unescape(encodeURIComponent(json)));

  return req.clone({
    body: encoded,
    setHeaders: { 'Content-Type': 'text/plain' },
  });
}
