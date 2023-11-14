import { Request, Response } from "express";
import Issue, { IIssue } from "../models/issue";
import { ObjectId } from "mongoose";

export const postNewIssue = async (req: Request, res: Response) => {
  const { title, description, priority }: IIssue = req.body;
  const userID: ObjectId = req.body.confirmedUser._id;
  const issueData = {
    title,
    description,
    priority,
    createdAt: new Date(),
    user:userID
  };

  const issue = new Issue(issueData);

  await issue.save();

  res.status(201).json({
    issue
  })
};
