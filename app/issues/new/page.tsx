"use client";
import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";
import {IoInformationCircle} from "react-icons/io5";

interface IssueForm {
    title: string
    description: string
}

const NewIssue = () => {
    const [error, setError] = useState('');

    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();

    return (
        <div  className="max-w-xl ">
            {
                error && <Callout.Root className="mb-3" color="red">
                    <Callout.Icon>
                        <IoInformationCircle/>
                    </Callout.Icon>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>

            }
            <form
                className=" space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push("/issues");
                    } catch (error) {
                        setError("An unexpected error occurred .")
                    }

                })}
            >
                <TextField.Root>
                    <TextField.Input className="" placeholder="Title" {...register("title")} />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <Button className="cursor-pointer">Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssue;
