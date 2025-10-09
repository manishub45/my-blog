import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    
    // Naya state image preview ke liye
    const [previewUrl, setPreviewUrl] = useState(null);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
            // Image preview ke liye naya logic
            if (name === "image" && value.image && value.image[0]) {
                setPreviewUrl(URL.createObjectURL(value.image[0]));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        // Form ke layout ko aacha banaya gaya hai
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-100 p-4 sm:p-8 rounded-lg">
            {/* Left Column */}
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                
                {/* Purani image ka preview (Edit mode mein) */}
                {post && (
                    <div className="w-full mb-4">
                        <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                
                {/* Nayi select ki hui image ka preview */}
                {previewUrl && (
                     <div className="w-full mb-4">
                        <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                        <img
                            src={previewUrl}
                            alt="New Preview"
                            className="rounded-lg"
                        />
                    </div>
                )}
                
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-600"} className="w-full hover:opacity-90">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}