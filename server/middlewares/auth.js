import { clerkClient } from "@clerk/express";
import { use } from "react";

export const auth = async (req, res, next) => {
    try {
        const {userId, has} = await req.auth();
        const hasPremiumPlan = await has({plan:"premium"});

        const user = await clerkClient.users.getUser(userId);
        const plan = user.privateMetadata
        console.log(user);
        
        console.log(plan);
        

        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            req.free_usage = user.privateMetadata.free_usage;
        }else{
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage:0,
                    plan:'premium'
                }
            })
            req.free_usage = 0;
        }
        req.plan = hasPremiumPlan ? "premium" : "free";
        console.log(hasPremiumPlan);

        next();
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}