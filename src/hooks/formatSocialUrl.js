// Common social link formatter
    const  formatSocialUrl = (platform, value) => {
        if (!value) return "";

        let input = value.trim();

        // Step 1: remove double URL (like https://www.instagram.com/https://...)
        const doubleUrlIndex = input.indexOf("https://", 8);
        if (doubleUrlIndex !== -1) {
            input = input.slice(doubleUrlIndex);
        }

        // Step 2: clean extra trailing slashes
        input = input.replace(/\/+$/, "");

        // Step 3: build final URLs based on platform
        switch (platform.toLowerCase()) {
            case "apple":
            return input.startsWith("http")
                ? input
                : `https://music.apple.com/profile/${input}`;

            case "spotify":
            return input.startsWith("http")
                ? input
                : `https://open.spotify.com/artist/${input}`; // or 'user/' if needed

            case "instagram":
            return input.startsWith("http")
                ? input
                : `https://www.instagram.com/${input}`;

            case "facebook":
            return input.startsWith("http")
                ? input
                : `https://www.facebook.com/${input}`;

            case "youtube":
            return input.startsWith("http")
                ? input
                : `https://www.youtube.com/${input}`;

            default:
            return input;
        }
    }

    export default formatSocialUrl;