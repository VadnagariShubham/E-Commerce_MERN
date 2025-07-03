
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
    Select,

    SelectContent,
   
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"; // Ensure correct path



function CommonForm({ formControls
    , formData
    ,isBtnDisabled
    , setFormData
    , onSubmit,
     ButtonText }) {

    function renderInputsByComponentsType(getControlItem) {
        const value = formData[getControlItem.name] || "";
        let element = null;

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;

                case "select":
                    element = (
                        <Select
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    [getControlItem.name]: value,
                                })
                            }
                            value={value}
                        >
                            <SelectTrigger className={getControlItem.inputClassName || "w-full bg-white text-black border border-gray-300 rounded"}>
                                <SelectValue placeholder={getControlItem.label} />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black border border-gray-200">
                                {getControlItem.options && getControlItem.options.length > 0
                                    ? getControlItem.options.map((optionItem) => (
                                          <SelectItem
                                              key={optionItem.id}
                                              value={optionItem.id}
                                              className="hover:bg-gray-100 focus:bg-gray-100"
                                          >
                                              {optionItem.label}
                                          </SelectItem>
                                      ))
                                    : null}
                            </SelectContent>
                        </Select>
                    );
                    break;
                

            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;
        }

        return element; // ✅ Move return outside switch
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.Label}</Label>
                        {renderInputsByComponentsType(controlItem)}
                    </div>
                ))}
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 bg-black text-white hover:bg-slate-600 w-full">
                {ButtonText || "Submit"}
            </Button>
        </form>
    );
}

export default  CommonForm;
