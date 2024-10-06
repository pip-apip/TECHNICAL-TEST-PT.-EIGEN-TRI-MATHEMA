import express, { Request, Response } from 'express';
import { MemberService } from '../application/memberService';
import { Member } from '../domain/memberEntity';

const router = express.Router();
const memberService = new MemberService();

router.get('/', async (req: Request, res: Response) => {
  const members = await memberService.getAllMember();
  res.json(members);
});

router.post('/', async (req: Request, res: Response) => {
  const { code, name } = req.body;
  const member = new Member(code, name);
  await memberService.createMember(member);
  res.status(201).json({ message: "Member created" });  
});

router.put('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  const { name } = req.body;
  const member = new Member(code, name);
  console.log(member);
  await memberService.updateMember(code, member);
  res.json({ message: "Member updated" });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { code } = req.params;
  await memberService.deleteMember(code);
  res.json({ message: "Member deleted" });
});

export { router as MemberController };
