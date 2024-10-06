import { db } from "../infrastructure/database";
import { Member } from "../domain/memberEntity";

export class MemberService {
  async getAllMember(): Promise<Member[]> {
    const [rows] = await db.query("SELECT m.*, count(t.id_transaction) books_borrowed FROM members m LEFT JOIN transactions t ON t.member_code = m.code AND t.return_date IS NULL GROUP BY m.code");
    return rows as Member[];
  }

  async createMember(member: Member): Promise<void> {
    await db.query("INSERT INTO members (code, name) VALUES (?, ?)", [member.code, member.name]);
  }

  async updateMember(code: string, member: Member): Promise<void> {
    await db.query("UPDATE members SET name=? WHERE code=?", [member.name, code]);
  }

  async deleteMember(code: string): Promise<void> {
    await db.query("DELETE FROM members WHERE code=?", [code]);
  }
}
