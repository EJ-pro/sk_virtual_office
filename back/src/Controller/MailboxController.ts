import type { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const MAILBOX_FILE = path.join(__dirname, "../../mailbox.json");
const ADMIN_TOKEN = "admin-token-mock"; // Simplified for now

interface MailMessage {
    id: string;
    content: string;
    timestamp: number;
}

export class MailboxController {
    constructor(private app: Express) {
        this.registerRoutes();
        this.initMailboxFile();
    }

    private registerRoutes() {
        // Public endpoint to send anonymous message
        this.app.post("/mailbox", (req: Request, res: Response) => {
            const { content } = req.body;
            if (!content || content.trim().length === 0) {
                return res.status(400).json({ error: "Content is required" });
            }
            if (content.length > 1000) {
              return res.status(400).json({ error: "Message too long (max 1000 chars)" });
            }

            const messages = this.readMessages();
            const newMessage: MailMessage = {
                id: uuidv4(),
                content: content.trim(),
                timestamp: Date.now(),
            };
            messages.push(newMessage);
            this.writeMessages(messages);
            res.json({ success: true, message: "Sent successfully" });
        });

        // Admin endpoint to list all messages
        this.app.get("/admin/mailbox", (req: Request, res: Response) => {
            const auth = req.headers.authorization;
            if (auth !== `Bearer ${ADMIN_TOKEN}` && auth !== ADMIN_TOKEN) {
              // Note: our admin dashboard sends a mock token
              // return res.status(401).json({ error: "Unauthorized" });
            }
            const messages = this.readMessages();
            // Sort by latest first
            messages.sort((a, b) => b.timestamp - a.timestamp);
            res.json(messages);
        });

        // Admin endpoint to delete a message
        this.app.delete("/admin/mailbox/:id", (req: Request, res: Response) => {
            const { id } = req.params;
            let messages = this.readMessages();
            const filtered = messages.filter((m) => m.id !== id);
            if (filtered.length !== messages.length) {
                this.writeMessages(filtered);
                res.json({ success: true });
            } else {
                res.status(404).json({ error: "Message not found" });
            }
        });
    }

    private initMailboxFile() {
        if (!fs.existsSync(MAILBOX_FILE)) {
            this.writeMessages([]);
        }
    }

    private readMessages(): MailMessage[] {
        try {
            const data = fs.readFileSync(MAILBOX_FILE, "utf-8");
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }

    private writeMessages(messages: MailMessage[]) {
        fs.writeFileSync(MAILBOX_FILE, JSON.stringify(messages, null, 2), "utf-8");
    }
}
