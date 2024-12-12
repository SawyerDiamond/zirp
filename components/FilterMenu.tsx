import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
export function FilterMenu() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>FILTERS</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <Separator />
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </DialogHeader>
    </DialogContent>
  );
}
