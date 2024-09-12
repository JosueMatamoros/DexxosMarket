export const deeplApiKey = ''; // Introduce DeepL API Key
export const deeplApiUrl = 'https://api-free.deepl.com/v2/translate';

export async function translateText(text, targetLang) {
    try {
        const response = await fetch(deeplApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${deeplApiKey}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'text': text,
                'target_lang': targetLang.toUpperCase(),
            }),
        });

        const data = await response.json();
        return data.translations[0].text;
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
}