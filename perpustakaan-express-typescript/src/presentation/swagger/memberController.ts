import express, { Request, Response } from 'express';
import { MemberService } from '../../application/memberService';
import { Member } from '../../domain/memberEntity';

const router = express.Router();
const memberService = new MemberService();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members and number of books being borrowed
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of all members
 */
router.get('/', async (req: Request, res: Response) => {
  const members = await memberService.getAllMember();
  res.json(members);
});

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created
 */
router.post('/', async (req: Request, res: Response) => {
  const { code, name } = req.body;
  const member = new Member(code, name);
  await memberService.createMember(member);
  res.status(201).json({ message: "Member created" });  
});

/**
 * @swagger
 * /members/{code}:
 *   put:
 *     summary: Edit member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member updated
 */
router.put('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  const { name } = req.body;
  const member = new Member(code, name);
  await memberService.updateMember(code, member);
  res.json({ message: "Member updated" });
});

/**
 * @swagger
 * /members/{code}:
 *   delete:
 *     summary: Delete member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     responses:
 *       201:
 *         description: Member deleted
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { code } = req.params;
  await memberService.deleteMember(code);
  res.json({ message: "Member deleted" });
});

export { router as MemberController };
