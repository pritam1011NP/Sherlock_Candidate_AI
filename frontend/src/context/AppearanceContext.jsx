import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";

import {
    getAppearanceSettings,
} from "../api/appearanceSettingsApi";

const AppearanceContext = createContext(null);

export function AppearanceProvider({ children }) {

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Load appearance settings from backend
     */
    async function loadSettings() {

        try {

            const data = await getAppearanceSettings();

            console.log(
                "Appearance settings loaded:",
                data
            );

            setSettings(data);

            return data;

        } catch (error) {

            console.error(
                "Failed to load appearance settings:",
                error
            );

            /*
             * Keep the application usable even if the
             * appearance-settings API is temporarily unavailable.
             */
            const fallbackSettings = {
                theme: "Light",
                primary_color: "#2563EB",
                font_size: "Medium",
                compact_mode: false,
                sidebar_collapsed: false,
                animations: true,
                rounded_corners: true,
                card_shadow: true,
                dense_tables: false,
                show_dashboard_background: false,
            };

            setSettings(fallbackSettings);

            return fallbackSettings;

        } finally {

            setLoading(false);

        }

    }

    /**
     * Load settings when the application starts
     */
    useEffect(() => {

        loadSettings();

    }, []);

    /**
     * Update global appearance settings.
     *
     * AppearanceSettings.jsx calls this after saving/resetting
     * settings so ThemeProvider immediately receives the new values.
     */
    function updateSettings(updatedSettings) {

        if (!updatedSettings) {
            return;
        }

        console.log(
            "Updating global appearance settings:",
            updatedSettings
        );

        setSettings(updatedSettings);

    }

    /**
     * Replace only selected appearance values.
     *
     * This is useful when you want to update one setting
     * without replacing the entire object.
     */
    function updateSetting(field, value) {

        setSettings((previous) => ({

            ...previous,

            [field]: value,

        }));

    }

    const value = useMemo(
        () => ({

            settings,

            setSettings,

            updateSettings,

            updateSetting,

            reload: loadSettings,

        }),
        [settings]
    );

    /**
     * Wait until the initial appearance settings have loaded.
     *
     * This prevents ThemeProvider from creating a temporary
     * incorrect theme before the backend settings arrive.
     */
    if (loading) {

        return null;

    }

    return (

        <AppearanceContext.Provider value={value}>

            {children}

        </AppearanceContext.Provider>

    );

}


/**
 * Access the global appearance settings.
 */
export function useAppearance() {

    const context = useContext(
        AppearanceContext
    );

    if (!context) {

        throw new Error(
            "useAppearance must be used inside AppearanceProvider"
        );

    }

    return context;

}