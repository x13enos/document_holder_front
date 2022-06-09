const AxiosInterceptorsSetup = (navigate, instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 403)
        navigate('/sign-in');

      return Promise.reject(error);
    }
  );
};

export default AxiosInterceptorsSetup;