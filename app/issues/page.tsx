import { Button } from "@radix-ui/themes";
import Link  from "next/link";
const Issues = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Add Issue</Link>
      </Button>
    </div>
  );
};

export default Issues;
