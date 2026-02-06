export const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64String = result.split(',')[1];
            if (base64String) {
                resolve({ base64: base64String, mimeType: file.type });
            } else {
                reject(new Error("Failed to extract base64 string from file."));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};
