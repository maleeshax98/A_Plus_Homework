import { changeWebStatus, getWebStatus } from "@/actions/admin/action";
import Loading from "@/components/Loading";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useEffect, useState } from "react";
export default function WebStatus() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const run = async () => {
      const res = await getWebStatus();
      setSelected(res?.status);
    };

    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (selected !== null) {
        setLoading(true);
        const res = await changeWebStatus(selected);
        setLoading(false);
      }
    };

    run();
  }, [selected]);

  if (selected === null || loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <p className="text-primary-200 font-semibold mb-[10px]">
          Website is currently :- {selected ? <>ACTIVE</> : <>BLOCKED</>}
        </p>
        <RadioGroup
          label="Manage Website Accessibility"
          value={selected}
          onValueChange={setSelected}
          color={"default"}
        >
          <Radio value={false}>Block Website</Radio>
          <Radio value={true}>Activate Website</Radio>
        </RadioGroup>
      </div>
    );
  }
}
