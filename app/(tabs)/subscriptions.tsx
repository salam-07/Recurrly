import SubscriptionCard from "@/components/SubscriptionCard";
import "@/global.css";
import { useSubscriptions } from "@/lib/subscriptionsContext";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
    const { subscriptions } = useSubscriptions();
    const [query, setQuery] = useState("");
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    const normalizedQuery = query.trim().toLowerCase();

    const filteredSubscriptions = useMemo(() => {
        if (!normalizedQuery) {
            return subscriptions;
        }

        return subscriptions.filter((subscription) => {
            const searchableFields = [
                subscription.name,
                subscription.plan,
                subscription.category,
                subscription.billing,
                subscription.status,
                subscription.paymentMethod,
            ];

            return searchableFields.some((field) =>
                field?.toLowerCase().includes(normalizedQuery),
            );
        });
    }, [normalizedQuery, subscriptions]);

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <View className="mb-5 gap-3">
                <Text className="text-3xl font-sans-bold text-primary">Subscriptions</Text>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search by name, category, plan, or status"
                    placeholderTextColor="rgba(0, 0, 0, 0.45)"
                    className="rounded-2xl border border-border bg-card px-4 py-3 text-base font-sans-medium text-primary"
                />
                <Text className="text-sm font-sans-medium text-muted-foreground">
                    {filteredSubscriptions.length} subscription{filteredSubscriptions.length === 1 ? "" : "s"}
                </Text>
            </View>

            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() => {
                            setExpandedSubscriptionId((currentId) => (currentId === item.id ? null : item.id));
                        }}
                    />
                )}
                extraData={expandedSubscriptionId}
                ItemSeparatorComponent={() => <View className="h-4" />}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    <Text className="home-empty-state">
                        {normalizedQuery ? "No subscriptions match your search." : "No subscriptions yet."}
                    </Text>
                }
                contentContainerClassName="pb-30"
            />
        </SafeAreaView>
    );
};

export default Subscriptions;