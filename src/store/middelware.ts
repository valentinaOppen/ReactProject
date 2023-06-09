import axios from "axios";
import * as actions from "./api";

const api =
    ({ dispatch }: any) =>
        (next: any) =>
            async (action: any) => {
                if (action.type !== actions.apiCallBegan.type) return next(action);

                const { url, method, data, onStart, onSuccess, onError } =
                    action.payload;

                if (onStart) dispatch({ type: onStart });

                next(action);

                try {
                    const response = await axios.request({
                        baseURL: "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros",
                        url,
                        method,
                        data,
                        headers: { 'authorId': 1 }
                    });
                    if (response.status === 200) {
                        dispatch({ type: onSuccess, payload: response.data });
                    }
                    if (response.status === 206) {
                        dispatch({ type: onError, payload: response.data })
                    }
                } catch (error: any) {
                    // General
                    dispatch(actions.apiCallFailed(error.message));
                    // Specific
                    if (onError) dispatch({ type: onError, payload: error.message });
                }
            };

export default api;