import * as StoreReview from 'expo-store-review';

const requestReview = async () => {
    const status = StoreReview.isSupported();
    if (status) StoreReview.requestReview();
}

export const handleAction = (action) => {
    action = action.replace("tldtdl://", "")
    if (action === "review") requestReview();
}
