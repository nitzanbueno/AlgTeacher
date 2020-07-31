import React, {FC, useState, ReactText} from "react";
import {ViewStyle} from "react-native";
import {Picker} from "@react-native-community/picker";
import TextPrompt from "./TextPrompt";

const ADD_OPTION_KEY: string = "add";

interface Props {
    style?: ViewStyle;
    options: string[];
    onValueChange: (value: string) => void;
    addPromptText: string;
    addOptionText: string;
    selectedValue: string;
}

const PickerWithAddOption: FC<Props> = props => {
    const [shouldDisplayAddPrompt, setShouldDisplayAddPrompt] = useState(false);
    const {selectedValue: selectedOption} = props;

    function addOption(option: string) {
        // We can't add an option with the same name as ADD_OPTION_KEY, because that's
        // already the name of the "Add..." option.
        // (not a great loss, I don't care enough to add an error message either)
        if (option != "" && option != ADD_OPTION_KEY) {
            // The rest will take care of itself
            props.onValueChange(option);
        }
    };

    function promptAddOption() {
        setShouldDisplayAddPrompt(true);
    }

    function onOptionChange(option: ReactText, index: number) {
        if (option != ADD_OPTION_KEY) {
            props.onValueChange(option.toString());
        } else {
            promptAddOption();
        }
    };

    function Options() {
        const newOptions = [...props.options];

        // In case the user has added a new option
        if (selectedOption != "" && selectedOption != ADD_OPTION_KEY && !newOptions.includes(selectedOption)) {
            newOptions.push(selectedOption);
        }

        let pickerItems = newOptions.map(option => <Picker.Item color="black" label={option.toString()} value={option} key={option} />);

        pickerItems.unshift(<Picker.Item color="black" key={""} label="None" value={""} />);
        pickerItems.push(<Picker.Item color="blue" key={ADD_OPTION_KEY} label={props.addOptionText} value={ADD_OPTION_KEY} />);

        return pickerItems;
    }

    return (
        <>
        <Picker style={props.style} selectedValue={props.selectedValue} onValueChange={onOptionChange}>
            {Options()}
        </Picker>
        {shouldDisplayAddPrompt && (
            <TextPrompt
                prompt={props.addPromptText}
                onSubmit={result => {
                    setShouldDisplayAddPrompt(false);
                    addOption(result);
                }}
                onCancel={() => {
                    setShouldDisplayAddPrompt(false);
                }}
            />
        )}
        </>
    );
};

export default PickerWithAddOption;
