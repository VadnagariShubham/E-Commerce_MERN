import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 

function CommonForm({ onSubmit, formData, setFormData, buttonText, formControls }) {
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  return (
    <Fragment>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {formControls.map((control) => (
          <div key={control.name} className="mb-4">
            <Label htmlFor={control.name}>{control.label}</Label>
            <Input
              type={control.type || "text"}
              id={control.name}
              name={control.name}
              value={formData[control.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button type="submit">{buttonText || "Submit"}</Button>
      </form>
    </Fragment>
  );
}

// ✅ Make sure to export it correctly!
export {CommonForm} ;
