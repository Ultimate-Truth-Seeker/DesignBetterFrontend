import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["cypress/**"]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      // warnings
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/alt-text': 'off',
      "react-hooks/rules-of-hooks": 'off'
    }
  }
];

export default eslintConfig;
