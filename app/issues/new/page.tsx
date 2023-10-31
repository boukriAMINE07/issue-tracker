"use client";
import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {IoInformationCircle} from "react-icons/io5";
import {createIssueSchema} from "@/app/validation/validationSchema";
import {zodResolver} from "@hookform/resolvers/zod"
import { z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";


type IssueForm = z.infer<typeof createIssueSchema>
const NewIssue = () => {
    const [error, setError] = useState('');
    const [isSubmitting, setISubmitting] = useState(false);


    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const onSubmit=handleSubmit(async (data) => {
        try {
            setISubmitting(true)
            await axios.post('/api/issues', data)
            router.push("/issues");
        } catch (error) {
            setISubmitting(false)
            setError("An unexpected error occurred .")
        }

    })
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
                onSubmit={onSubmit}
            >
                <TextField.Root>
                    <TextField.Input placeholder="Title"  {...register("title")} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />

                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}  className="cursor-pointer" > Submit New Issue {isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    );
};

export default NewIssue;
