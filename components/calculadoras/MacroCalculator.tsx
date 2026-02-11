'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Beef, Wheat, Droplet, Target } from 'lucide-react';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label` font-weight: 600; font-size: 0.9rem; `;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  &:focus { outline: none; border-color: #F59E0B; box-shadow: 0 0 0 4px #F59E0B20; }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: white;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
`;

const ResultHeader = styled.div`
  text-align: center;
  margin: 32px 0 24px;
`;

const MacroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MacroCard = styled.div<{ $color: string; $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border: 2px solid ${({ $color }) => $color};
  padding: 24px 16px;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
  animation: fadeIn 0.4s ease-out both;

  &:hover { transform: translateY(-5px); }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const MacroValue = styled.div<{ $color: string }>`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ $color }) => $color};
  margin: 8px 0;
`;

export default function MacroCalculator() {
    const [calories, setCalories] = useState('');
    const [goal, setGoal] = useState('maintenance');
    const [results, setResults] = useState<{ protein: number; fat: number; carbs: number; goalText: string } | null>(null);

    const calculateMacros = () => {
        const c = parseFloat(calories.replace(',', '.'));
        if (!c || c <= 0) {
            alert('Por favor, insira as calorias diárias.');
            return;
        }

        let pPerc, fPerc, cPerc, goalText;

        if (goal === 'burn') {
            pPerc = 0.40; fPerc = 0.25; cPerc = 0.35;
            goalText = 'Perda de Gordura (Alta Proteína)';
        } else if (goal === 'build') {
            pPerc = 0.30; fPerc = 0.25; cPerc = 0.45;
            goalText = 'Ganho de Massa (Alta Performance)';
        } else {
            pPerc = 0.25; fPerc = 0.30; cPerc = 0.45;
            goalText = 'Equilibrado (Manutenção)';
        }

        setResults({
            protein: Math.round((c * pPerc) / 4),
            carbs: Math.round((c * cPerc) / 4),
            fat: Math.round((c * fPerc) / 9),
            goalText
        });
    };

    return (
        <Card>
            <Form>
                <FormGroup>
                    <Label>Alvo Calórico Diário (kcal)</Label>
                    <Input type="text" inputMode="decimal" placeholder="Ex: 2200" value={calories} onChange={(e) => setCalories(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Seu Objetivo Atual</Label>
                    <div style={{ position: 'relative' }}>
                        <Select value={goal} onChange={(e) => setGoal(e.target.value)}>
                            <option value="maintenance">Manter Peso (Equilibrado)</option>
                            <option value="burn">Perder Gordura (Preservar Músculo)</option>
                            <option value="build">Ganhar Massa (Energia Máxima)</option>
                        </Select>
                    </div>
                </FormGroup>
                <Button onClick={calculateMacros} $fullWidth size="lg" style={{ backgroundColor: '#F59E0B' }}>
                    Distribuir Macronutrientes
                </Button>
            </Form>

            {results && (
                <>
                    <ResultHeader>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#B45309', fontWeight: 700, marginBottom: '8px' }}>
                            <Target size={20} /> Estratégia: {results.goalText}
                        </div>
                        <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Divisão diária recomendada em gramas:</p>
                    </ResultHeader>

                    <MacroGrid>
                        <MacroCard $color="#EF4444" $bg="#FEF2F2" style={{ animationDelay: '0.1s' }}>
                            <Beef color="#EF4444" size={32} />
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '12px', color: '#991B1B' }}>PROTEÍNAS</div>
                            <MacroValue $color="#B91C1C">{results.protein}g</MacroValue>
                            <div style={{ fontSize: '0.75rem', color: '#B91C1C' }}>4 kcal/g</div>
                        </MacroCard>

                        <MacroCard $color="#3B82F6" $bg="#EFF6FF" style={{ animationDelay: '0.2s' }}>
                            <Wheat color="#3B82F6" size={32} />
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '12px', color: '#1E40AF' }}>CARBOIDRATOS</div>
                            <MacroValue $color="#1E3A8A">{results.carbs}g</MacroValue>
                            <div style={{ fontSize: '0.75rem', color: '#1E3A8A' }}>4 kcal/g</div>
                        </MacroCard>

                        <MacroCard $color="#F59E0B" $bg="#FFFBEB" style={{ animationDelay: '0.3s' }}>
                            <Droplet color="#F59E0B" size={32} />
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '12px', color: '#92400E' }}>GORDURAS</div>
                            <MacroValue $color="#78350F">{results.fat}g</MacroValue>
                            <div style={{ fontSize: '0.75rem', color: '#78350F' }}>9 kcal/g</div>
                        </MacroCard>
                    </MacroGrid>

                    <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', fontSize: '0.85rem', color: '#4B5563', border: '1px solid #e5e7eb' }}>
                        <strong>Nota:</strong> Esta é uma estimativa inicial. Acompanhe seu progresso e ajuste os carboidratos se sentir muita fadiga ou as proteínas se tiver dificuldade em manter a massa magra.
                    </div>
                </>
            )}
        </Card>
    );
}
