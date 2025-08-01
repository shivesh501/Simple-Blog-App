import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    // State hooks to manage data, loading, and errors
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        // Flag to track if component is still mounted
        let isMounted = true;

        // Create a CancelToken to cancel the request if needed
        const source = axios.CancelToken.source();

        // Fetch data function to make the GET request
        const fetchData = async (url) => {
            setIsLoading(true); // Start loading state

            try {
                // Start fetching data asynchronously
                const response = await axios.get(url, { cancelToken: source.token });

                // Only update state if component is still mounted
                if (isMounted) {
                    setData(response.data); // Update data state
                    setFetchError(null); // Clear any previous errors
                }
            } catch (err) {
                // If an error occurs, check if component is still mounted
                if (isMounted) {
                    if (axios.isCancel(err)) {
                        console.log('Request canceled'); // Handle canceled requests (if canceled)
                    } else {
                        setFetchError(err.message); // Set error state
                        setData([]); // Clear data in case of error
                    }
                }
            } finally {
                // Finish loading whether the request was successful or failed
                if (isMounted) setIsLoading(false);
            }
        };

        // Start fetching data with provided URL
        fetchData(dataUrl);

        // Cleanup function to cancel the request if the component unmounts
        const cleanUp = () => {
            isMounted = false; // Mark component as unmounted
            source.cancel(); // Cancel the axios request to avoid any potential memory leaks
        };

        // Return the cleanup function to be executed when the component unmounts
        return cleanUp;

    }, [dataUrl]); // Effect depends on `dataUrl`; re-runs if `dataUrl` changes

    // Return the data, error, and loading states from the hook
    return { data, fetchError, isLoading };
};

export default useAxiosFetch;
