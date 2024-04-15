import * as Sentry from '@sentry/browser';

export function setupSentry() {
  Sentry.init({
    dsn: 'https://0c8214d0263fb84bbe9de352b663ddf3@o4507088476766208.ingest.us.sentry.io/4507088478404608',
  });
}

export function reportError(message: string, error: any) {
  console.error(message, error)
  Sentry.withScope((scope) => {
    scope.setExtra('message', message);
    Sentry.captureException(error);
  });
}
