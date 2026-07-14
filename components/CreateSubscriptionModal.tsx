import { icons } from "@/constants/icons";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

const CATEGORIES = [
    "Entertainment",
    "AI Tools",
    "Developer Tools",
    "Design",
    "Productivity",
    "Cloud",
    "Music",
    "Other",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
    Entertainment: "#ff6b6b",
    "AI Tools": "#b8d4e3",
    "Developer Tools": "#e8def8",
    Design: "#f5c542",
    Productivity: "#a8e6cf",
    Cloud: "#87ceeb",
    Music: "#ffa8a8",
    Other: "#d4b5e0",
};

interface CreateSubscriptionModalProps {
    visible: boolean;
    onClose: () => void;
    onSubscriptionCreated: (subscription: Subscription) => void;
}

const CreateSubscriptionModal = ({
    visible,
    onClose,
    onSubscriptionCreated,
}: CreateSubscriptionModalProps) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
    const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>(
        CATEGORIES[0]
    );

    const [nameError, setNameError] = useState("");
    const [priceError, setPriceError] = useState("");

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError("Name is required");
            isValid = false;
        } else {
            setNameError("");
        }

        const priceNum = parseFloat(price);
        if (!price.trim() || isNaN(priceNum) || priceNum <= 0) {
            setPriceError("Price must be a positive number");
            isValid = false;
        } else {
            setPriceError("");
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const now = dayjs();
        let renewalDate: string;

        if (frequency === "Monthly") {
            renewalDate = now.add(1, "month").toISOString();
        } else {
            renewalDate = now.add(1, "year").toISOString();
        }

        const newSubscription: Subscription = {
            id: `subscription-${Date.now()}`,
            name: name.trim(),
            price: parseFloat(price),
            category: selectedCategory,
            status: "active",
            startDate: now.toISOString(),
            renewalDate,
            icon: icons.wallet,
            billing: frequency,
            currency: "USD",
            color: CATEGORY_COLORS[selectedCategory],
        };

        onSubscriptionCreated(newSubscription);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setName("");
        setPrice("");
        setFrequency("Monthly");
        setSelectedCategory(CATEGORIES[0]);
        setNameError("");
        setPriceError("");
    };

    const isSubmitDisabled = !name.trim() || !price.trim();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View className="modal-overlay">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <Pressable className="flex-1" onPress={onClose} />

                    <View className="modal-container">
                        {/* Header */}
                        <View className="modal-header">
                            <Text className="modal-title">New Subscription</Text>
                            <Pressable
                                onPress={onClose}
                                className="modal-close"
                            >
                                <Text className="modal-close-text">×</Text>
                            </Pressable>
                        </View>

                        {/* Body */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View className="modal-body">
                                {/* Name Field */}
                                <View className="auth-field">
                                    <Text className="auth-label">Name</Text>
                                    <TextInput
                                        className={clsx(
                                            "auth-input",
                                            nameError ? "auth-input-error" : ""
                                        )}
                                        placeholder="Enter subscription name"
                                        placeholderTextColor="#999"
                                        value={name}
                                        onChangeText={(text) => {
                                            setName(text);
                                            if (nameError) setNameError("");
                                        }}
                                    />
                                    {nameError ? (
                                        <Text className="auth-error">{nameError}</Text>
                                    ) : null}
                                </View>

                                {/* Price Field */}
                                <View className="auth-field">
                                    <Text className="auth-label">Price</Text>
                                    <TextInput
                                        className={clsx(
                                            "auth-input",
                                            priceError ? "auth-input-error" : ""
                                        )}
                                        placeholder="0.00"
                                        placeholderTextColor="#999"
                                        keyboardType="decimal-pad"
                                        value={price}
                                        onChangeText={(text) => {
                                            setPrice(text);
                                            if (priceError) setPriceError("");
                                        }}
                                    />
                                    {priceError ? (
                                        <Text className="auth-error">{priceError}</Text>
                                    ) : null}
                                </View>

                                {/* Frequency Toggle */}
                                <View className="auth-field">
                                    <Text className="auth-label">Frequency</Text>
                                    <View className="picker-row">
                                        {(["Monthly", "Yearly"] as const).map((option) => (
                                            <Pressable
                                                key={option}
                                                onPress={() => setFrequency(option)}
                                                className={clsx(
                                                    "picker-option",
                                                    frequency === option ? "picker-option-active" : ""
                                                )}
                                            >
                                                <Text
                                                    className={clsx(
                                                        "picker-option-text",
                                                        frequency === option ? "picker-option-text-active" : ""
                                                    )}
                                                >
                                                    {option}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>

                                {/* Category Chips */}
                                <View className="auth-field">
                                    <Text className="auth-label">Category</Text>
                                    <View className="category-scroll">
                                        {CATEGORIES.map((category) => (
                                            <Pressable
                                                key={category}
                                                onPress={() => setSelectedCategory(category)}
                                                className={clsx(
                                                    "category-chip",
                                                    selectedCategory === category ? "category-chip-active" : ""
                                                )}
                                            >
                                                <Text
                                                    className={clsx(
                                                        "category-chip-text",
                                                        selectedCategory === category
                                                            ? "category-chip-text-active"
                                                            : ""
                                                    )}
                                                >
                                                    {category}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>

                                {/* Submit Button */}
                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={isSubmitDisabled}
                                    className={clsx(
                                        "auth-button",
                                        isSubmitDisabled ? "auth-button-disabled" : ""
                                    )}
                                >
                                    <Text className="auth-button-text">Add Subscription</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default CreateSubscriptionModal;
