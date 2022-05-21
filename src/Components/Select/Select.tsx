import { FC, useState } from "react";
import { Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ISelect } from "../../InterfacesTypes/GoodsInterface";
import { border } from "@mui/system";

interface DropListType {
    options: Array<ISelect>;
    name: string;
    control: any;
    rule?: boolean;
    ruleName?: string;
}

const DropList: FC<DropListType> = ({
    name,
    options,
    control,
    rule,
    ruleName,
}) => {
    const [value, setValue]: any = useState("");

    const optionsArr = options.map((option) => (
        <MenuItem key={option.name} value={`${option.value}`}>
            {option.name}
        </MenuItem>
    ));

    if (rule) {
        return (
            <>
                <Box
                    sx={{
                        borderRadius: 50,
                        color: "white",
                    }}
                >
                    <FormControl
                        sx={{
                            color: "white",
                        }}
                        fullWidth
                    >
                        <InputLabel
                            sx={{
                                color: "white",
                            }}
                            id="demo-simple-select-label"
                        >
                            {ruleName}
                        </InputLabel>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name={name}
                            render={({ field: { onChange } }) => (
                                <Select
                                    sx={{
                                        color: "white",
                                        borderRadius: 3,
                                        padding: 1.5,
                                        border: "2px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label={name}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        onChange(e.target.value);
                                    }}
                                >
                                    {optionsArr}
                                </Select>
                            )}
                        />
                    </FormControl>
                </Box>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    borderRadius: 50,
                    color: "white",
                }}
            >
                <FormControl
                    sx={{
                        color: "white,",
                    }}
                    fullWidth
                >
                    <InputLabel
                        sx={{
                            color: "white",
                        }}
                        id="demo-simple-select-label"
                    >
                        {name}
                    </InputLabel>
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { onChange } }) => (
                            <Select
                                sx={{
                                    width: 200,
                                    color: "white",
                                    border: "2px solid rgba(255, 255, 255, 0.1)",
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value}
                                label={name}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    onChange(e.target.value);
                                }}
                            >
                                <MenuItem value={0}>Без фільтра</MenuItem>
                                {optionsArr}
                            </Select>
                        )}
                    />
                </FormControl>
            </Box>
        </>
    );
};

export default DropList;
