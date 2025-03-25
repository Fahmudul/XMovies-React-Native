

# Setting Up Tailwind CSS in React Native (NativeWind)

Follow these steps to integrate **Tailwind CSS** into your **React Native** project using **NativeWind**.

---

## **1️⃣ Install Dependencies**

Run the following command to install all necessary packages:

```sh
npm install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context
```

Initialize **Tailwind CSS**:

```sh
npx tailwindcss init
```

---

## **2️⃣ Configure Tailwind CSS**

Modify the generated `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"], // Paths to component files
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## **3️⃣ Create a Global Stylesheet**

Create a `global.css` file inside the **app** directory:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## **4️⃣ Configure Babel**

Modify `babel.config.js` to include the **NativeWind preset**:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

---

## **5️⃣ Configure Metro Bundler**

Modify `metro.config.js` for proper asset handling:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

📌 If `metro.config.js` does not exist, create one using:

```sh
npx expo customize metro.config.js
```

---

## **6️⃣ TypeScript Configuration**

To extend **React Native types** for NativeWind, create a `nativewind-env.d.ts` file in the root directory and add:

```ts
/// <reference types="nativewind/types" />
```

---

## **7️⃣ Import Global Styles**

Import the **global CSS file** in `App.tsx` (or the main entry file):

```tsx
import "./global.css";

export default function App() {
  return (
    /* Your App Code */
  );
}
```

---

## **8️⃣ Start Your App**

Make sure to start the app with:

```sh
npx expo start --clear
```

---

## **🎉 You're All Set!**

Now you can use **Tailwind CSS classes** in your **React Native components** like this:

```tsx
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-lg">Hello, React Native! 🎉</Text>
    </View>
  );
}
```

🚀 **Enjoy building beautiful UIs with Tailwind CSS in React Native!** 🎨

