const React = require('react');
const { useQuery } = require('react-query');

/**
 * Resolves https://github.com/tannerlinsley/react-query/issues/78
 * Orchestrates `useQuery` by using previous query results as initial data
 */
function usePageQuery(
  queryKey,
  queryFn,
  {
    initialData, onSuccess, ...queryConfig
  } = {},
) {
  const initialDataRef = React.useRef(initialData);

  return useQuery(queryKey, queryFn, {
    ...queryConfig,
    initialData: initialDataRef.current,
    onSuccess: (data) => {
      initialDataRef.current = data;
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
}

module.exports = {
  usePageQuery,
};
