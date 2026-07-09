// Wrapper um @vercel/style-guide - keine eigene Logik!
module.exports = {
    extends: [
        '@vercel/style-guide/eslint/browser',
        '@vercel/style-guide/eslint/react',
        '@vercel/style-guide/eslint/next',
        '@vercel/style-guide/eslint/typescript',
        'prettier'
    ]
};