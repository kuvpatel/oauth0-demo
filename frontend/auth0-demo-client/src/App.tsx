import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getPublicMessage,
  getProtectedMessage,
  type MessageResponse,
} from './services/messageService';

function App() {
  const {
    isLoading,
    isAuthenticated,
    user,
    error: authError,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [publicMessage, setPublicMessage] =
    useState<MessageResponse | null>(null);
  const [protectedMessage, setProtectedMessage] =
    useState<MessageResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetPublicMessage = async () => {
    setLoading(true);
    setApiError(null);
    setPublicMessage(null);

    try {
      const result = await getPublicMessage();
      setPublicMessage(result);
    } catch (err) {
      console.error(err);
      setApiError('Failed to retrieve the public message.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetProtectedMessage = async () => {
    setLoading(true);
    setApiError(null);
    setProtectedMessage(null);

    try {
      const accessToken = await getAccessTokenSilently();
      const result = await getProtectedMessage(accessToken);
      setProtectedMessage(result);
    } catch (err) {
      console.error(err);
      setApiError('Failed to retrieve the protected message.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container mt-5">Loading authentication...</div>;
  }

  if (authError) {
    return (
      <div className="container mt-5">
        <h2>Authentication Error</h2>
        <pre>{authError.message}</pre>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Auth0 OAuth Demo</h1>

      <div className="mb-4">
        {!isAuthenticated ? (
          <button
            className="btn btn-primary"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        ) : (
          <div>
           <div className="card mb-4">
  <div className="card-header">
    Authenticated User
  </div>

  <div className="card-body">
    <p>
      <strong>Name:</strong> {user?.name ?? 'Not available'}
    </p>

    <p>
      <strong>Email:</strong> {user?.email ?? 'Not available'}
    </p>

    <p>
      <strong>Auth0 User ID:</strong> {user?.sub ?? 'Not available'}
    </p>
  </div>
</div>
            <button
              className="btn btn-outline-danger me-2"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <hr />

      <h2>API Messages</h2>

      <div className="mb-3">
        <button
          className="btn btn-success me-2"
          onClick={handleGetPublicMessage}
          disabled={loading}
        >
          Get Public Message
        </button>

        <button
          className="btn btn-primary"
          onClick={handleGetProtectedMessage}
          disabled={loading || !isAuthenticated}
        >
          Get Protected Message
        </button>
      </div>

      {loading && <p>Loading API response...</p>}

      {publicMessage && (
        <div className="alert alert-success">
          <strong>Public API:</strong> {publicMessage.message}
        </div>
      )}

      {protectedMessage && (
        <div className="alert alert-info">
          <strong>Protected API:</strong> {protectedMessage.message}
          {protectedMessage.userId && (
            <div>
              <strong>User ID:</strong> {protectedMessage.userId}
            </div>
          )}
        </div>
      )}

      {apiError && (
        <div className="alert alert-danger">{apiError}</div>
      )}
    </div>
  );
}

export default App;