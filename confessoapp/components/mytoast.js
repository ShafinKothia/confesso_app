import { Alert, HStack, VStack } from "native-base";
import React from "react";
export default function MyToast(data) {
    useEffect(() => {
        console.log(data);
    })
    return (
        <Alert status={status}>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {text}            </Text>
                    </HStack>

                </HStack>
            </VStack>
        </Alert>
    )
}