import { Link, useLocalSearchParams } from 'expo-router';
import { styled } from "nativewind";
import { usePostHog } from 'posthog-react-native';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const SubscriptionDetails = () => {
    const { id } = useLocalSearchParams<{ id: string; }>();
    const posthog = usePostHog();

    useEffect(() => {
        if (!id) {
            return;
        }

        posthog.capture('subscription_details_viewed', {
            subscription_id: id,
        });
    }, [id, posthog]);

    return (
        < SafeAreaView >
            <Text>SubscriptionDetails: {id}</Text>
            <Link href="/">Go Back</Link>
        </SafeAreaView >
    );
};

export default SubscriptionDetails;