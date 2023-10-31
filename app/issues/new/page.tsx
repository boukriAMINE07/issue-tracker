"use client";
import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {IoInformationCircle} from "react-icons/io5";
import {createIssueSchema} from "@/app/validation/validationSchema";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod";


type IssueForm=z.infer<typeof createIssueSchema>
const NewIssue = () => {
    const [error, setError] = useState('');

    const router = useRouter();
    const {register, control, handleSubmit,formState:{errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    return (
        <div className="max-w-xl ">
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
                    <TextField.Input  placeholder="Title"  {...register("title")} />
                </TextField.Root>
                {errors.title && <Text color="red" as="p" >{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE   placeholder="Description" {...field} />
                    )}
                />
                {errors.description && <Text color="red"  as="p">{errors.description.message}</Text>}

                <Button className="cursor-pointer ">Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssue;
