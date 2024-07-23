import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mute } from "@/components/ui/typography";

type FormInputProps = {
    id: string;
    label: string;
    type: string;
    register: any;
    errors: any;
    validation: any;
};

export function FormInput({ id, label, type, register, errors, validation }: FormInputProps) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} {...register(id, validation)} />
            {errors[id] && <Mute className="pt-5 text-primary flex items-center gap-3">{errors[id].message}</Mute>}
        </div>
    );
}
