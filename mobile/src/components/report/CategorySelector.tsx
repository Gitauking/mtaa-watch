/*
|--------------------------------------------------------------------------
| CategorySelector Component
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Allows the user to choose the type of incident
| they are reporting.
|
| WHY NOT A DROPDOWN?
|
| Mobile users can see every available category
| immediately without opening another menu.
|
| The selected category is highlighted using
| the application's primary colour.
|
*/

import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    Colors,
    Spacing,
    Typography,
    Radius,
} from "../../constants";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
| selectedCategory
|     The category currently chosen.
|
| onSelectCategory
|     Function called whenever the user taps
|     another category.
|
| categories
|     List of categories to display.
|
*/

type Category = {

    id: number;

    name: string;

};

type CategorySelectorProps = {

    categories: Category[];

    selectedCategory: number | null;

    onSelectCategory: (categoryId: number) => void;

};

export default function CategorySelector({

    categories,

    selectedCategory,

    onSelectCategory,

}: CategorySelectorProps) {

    return (

        <View>

            {/*----------------------------------------------------------
                Section Heading
            ----------------------------------------------------------*/}

            <Text style={styles.label}>

                Incident Category

            </Text>

            {/*----------------------------------------------------------
                Category Chips

                i loop through every category inside the
                categories array.

                React creates ONE chip for EACH category.

                Example

                categories =

                [
                    "Road Damage",
                    "Flooding",
                    "Illegal Dumping"
                ]

                becomes

                [Road Damage]

                [Flooding]

                [Illegal Dumping]
            ----------------------------------------------------------*/}

            <View style={styles.container}>

                {

                    categories.map((category) => {

                        /*
                        --------------------------------------------------
                        Is this category currently selected?

                        This returns either

                        true

                        or

                        false

                        i use it to change the chip colour.
                        --------------------------------------------------
                        */

                        const isSelected =
                            selectedCategory === category.id;

                        return (

                            <TouchableOpacity

                                key={category.id}

                                style={[

                                    styles.chip,

                                    isSelected &&
                                    styles.selectedChip,

                                ]}

                                onPress={() =>
                                    onSelectCategory(category.id)
                                }

                            >

                                <Text

                                    style={[

                                        styles.text,

                                        isSelected &&
                                        styles.selectedText,

                                    ]}

                                >

                                    {category.name}

                                </Text>

                            </TouchableOpacity>

                        );

                    })

                }

            </View>

        </View>

    );

}

const styles = StyleSheet.create({

    label: {

        fontSize: Typography.body,

        fontWeight: "700",

        color: Colors.text,

        marginBottom: Spacing.md,

    },

    container: {

        flexDirection: "row",

        flexWrap: "wrap",

    },

    chip: {

        backgroundColor: Colors.white,

        borderRadius: Radius.full ?? 999,

        paddingHorizontal: Spacing.lg,

        paddingVertical: Spacing.sm,

        marginRight: Spacing.sm,

        marginBottom: Spacing.sm,

        borderWidth: 1,

        borderColor: "#D1D5DB",

    },

    selectedChip: {

        backgroundColor: Colors.primary,

        borderColor: Colors.primary,

    },

    text: {

        color: Colors.text,

        fontSize: Typography.small,

        fontWeight: "600",

    },

    selectedText: {

        color: Colors.white,

    },

});