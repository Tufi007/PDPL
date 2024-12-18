import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  const errorMessage = isRouteErrorResponse(error)
    ? error.error?.message || error.statusText
    : 'An unexpected error occurred';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-600">
          <i>{errorMessage}</i>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;