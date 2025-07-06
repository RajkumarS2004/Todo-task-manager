import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');
    
    if (errorParam) {
      setError('Authentication failed. Please try again.');
      return;
    }

    if (token && !isProcessing) {
      setIsProcessing(true);
      const handleLogin = async () => {
        try {
          // Use the loginWithToken function from AuthContext
          await loginWithToken(token);
          toast.success('Welcome to TaskFlow! 🎉');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } catch (err) {
          console.error('Login error:', err);
          setError('An error occurred during login. Please try again.');
        }
      };
      handleLogin();
    } else if (!token) {
      setError('No authentication token received.');
    }
  }, [searchParams, loginWithToken, navigate, isProcessing]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden px-4 py-6 sm:py-8">
        {/* Bokeh Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/10 blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/15 blur-2xl animate-pulse delay-2000" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
          <div className="card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl glass-dark border border-[#00eaff]/30 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-red-400 mb-3 sm:mb-4 lg:mb-6">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient-cyan mb-2">
              Authentication Error
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#b0b8c1] mb-4 sm:mb-6 lg:mb-8 px-2">{error}</p>
            <button
              onClick={() => navigate('/signin')}
              className="btn-primary w-full py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold touch-manipulation"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden px-4 py-6 sm:py-8">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/10 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/15 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-64 sm:h-64 rounded-full bg-[#00eaff]/8 blur-3xl animate-pulse delay-1500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
        <div className="card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl glass-dark border border-[#00eaff]/30 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-gradient-cyan rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-cyan border border-[#00eaff] mb-3 sm:mb-4 lg:mb-6 animate-pulse">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white drop-shadow-lg animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient-cyan mb-2">
            Authenticating...
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#b0b8c1] px-2">
            Please wait while we complete your login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess; 