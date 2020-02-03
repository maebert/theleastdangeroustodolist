import * as StoreReview from 'expo-store-review';

const requestReview = async () => {
    const status = StoreReview.isAvailableAsync();
    console.log("Review")
    if (status) StoreReview.requestReview();
}

export const handleAction = (action) => {
    action = action.replace("tldtdl://", "")
    if (action === "review") requestReview();
}
