import type { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(__dirname, "../../users.json");
const ADMIN_ID = "root3951";
const ADMIN_PW = "root1401";

interface UserCredential {
    id: string;
    pw: string;
}

export class AdminController {
    constructor(private app: Express) {
        this.registerRoutes();
        this.initUsersFile();
    }

    private registerRoutes() {
        // 관리자 로그인 확인
        this.app.post("/admin/login", (req: Request, res: Response) => {
            const { id, pw } = req.body;
            if (id === ADMIN_ID && pw === ADMIN_PW) {
                res.json({ success: true, token: "admin-token-mock" });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        });

        // 유저 리스트 조회
        this.app.get("/admin/users", (req: Request, res: Response) => {
            const users = this.readUsers();
            res.json(users);
        });

        // 유저 추가/수정
        this.app.post("/admin/users", (req: Request, res: Response) => {
            const { id, pw } = req.body;
            if (!id || !pw) {
                return res.status(400).json({ error: "ID and PW are required" });
            }
            const users = this.readUsers();
            users[id] = pw;
            this.writeUsers(users);
            res.json({ success: true });
        });

        // 유저 삭제
        this.app.delete("/admin/users/:id", (req: Request, res: Response) => {
            const { id } = req.params;
            const users = this.readUsers();
            if (users[id]) {
                delete users[id];
                this.writeUsers(users);
                res.json({ success: true });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        });

        // 전체 초기화 (기존 30명)
        this.app.post("/admin/reset", (req: Request, res: Response) => {
            this.resetUsers();
            res.json({ success: true });
        });
    }

    private initUsersFile() {
        if (!fs.existsSync(USERS_FILE)) {
            this.resetUsers();
        }
    }

    private resetUsers() {
        const initialUsers: Record<string, string> = {
            "27기_강민준": "1234",
            "27기_권도윤": "1234",
            "27기_김도현": "1234",
            "27기_김민석": "1234",
            "27기_김서준": "1234",
            "27기_김우빈": "1234",
            "27기_김준우": "1234",
            "27기_김지호": "1234",
            "27기_김현우": "1234",
            "27기_남윤서": "1234",
            "27기_박도윤": "1234",
            "27기_박민준": "1234",
            "27기_박서우": "1234",
            "27기_박서준": "1234",
            "27기_백승우": "1234",
            "27기_서준혁": "1234",
            "27기_송지우": "1234",
            "27기_신지후": "1234",
            "27기_안해준": "1234",
            "27기_양지윤": "1234",
            "27기_오준서": "1234",
            "27기_유도율": "1234",
            "27기_윤서열": "1234",
            "27기_이건우": "1234",
            "27기_이도현": "1234",
            "27기_이민혁": "1234",
            "27기_이서진": "1234",
            "27기_이지안": "1234",
            "27기_이지형": "1234",
            "27기_정하늘": "1234",
        };
        this.writeUsers(initialUsers);
    }

    private readUsers(): Record<string, string> {
        try {
            const data = fs.readFileSync(USERS_FILE, "utf-8");
            return JSON.parse(data);
        } catch (e) {
            return {};
        }
    }

    private writeUsers(users: Record<string, string>) {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    }
}
