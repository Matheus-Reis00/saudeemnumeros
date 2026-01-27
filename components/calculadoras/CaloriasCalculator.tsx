'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  ${({ $full }) => $full && 'grid-column: 1 / -1;'}
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResultsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  animation: fadeIn 0.4s ease-out;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const ResultItem = styled.div<{ $variant?: 'loss' | 'maintenance' | 'gain' }>`
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  border: 2px solid ${({ theme, $variant }) =>
        $variant === 'maintenance' ? theme.colors.primary :
            $variant === 'loss' ? theme.colors.secondary :
                theme.colors.warning
    };
  background-color: ${({ theme, $variant }) =>
        $variant === 'maintenance' ? theme.colors.primary + '08' :
            $variant === 'loss' ? theme.colors.secondary + '08' :
                theme.colors.warning + '08'
    };
`;

const CalorieValue = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const SummaryText = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function CaloriasCalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('1.2');
    const [results, setResults] = useState<{ bmr: number; maintenance: number; extremeLoss: number; loss: number; gain: number } | null>(null);

    const calculateTDEE = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);

        if (!w || !h || !a) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // Fórmula de Mifflin-St Jeor (A mais precisa para TDEE atualmente)
        let bmr = 10 * w + 6.25 * h - 5 * a;
        bmr = gender === 'male' ? bmr + 5 : bmr - 161;

        const tdee = bmr * parseFloat(activity);

        setResults({
            bmr: Math.round(bmr),
            maintenance: Math.round(tdee),
            extremeLoss: Math.round(tdee - 1000),
            loss: Math.round(tdee - 500),
            gain: Math.round(tdee + 500),
        });
    };

    return (
        <Card>
            <Form>
                <FormGroup>
                    <Label>Seu Sexo</Label>
                    <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Idade (anos)</Label>
                    <Input type="number" placeholder="Ex: 30" value={age} onChange={(e) => setAge(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Peso (kg)</Label>
                    <Input type="number" placeholder="Ex: 70" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Altura (cm)</Label>
                    <Input type="number" placeholder="Ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
                </FormGroup>
                <FormGroup $full>
                    <Label>Nível de Atividade Física</Label>
                    <Select value={activity} onChange={(e) => setActivity(e.target.value)}>
                        <option value="1.2">Sedentário (Trabalho de escritório, sem exercícios)</option>
                        <option value="1.375">Leve (Exercício leve 1-3 dias por semana)</option>
                        <option value="1.55">Moderado (Exercício moderado 3-5 dias por semana)</option>
                        <option value="1.725">Intenso (Exercício pesado 6-7 dias por semana)</option>
                        <option value="1.9">Atleta (2x treinos pesados por dia, trabalho físico)</option>
                    </Select>
                </FormGroup>
            </Form>

            <Button onClick={calculateTDEE} $fullWidth size="lg">Calcular Gasto Calórico</Button>

            {results && (
                <ResultsWrapper>
                    <SummaryText>Seu gasto energético diário estimado é de {results.maintenance} kcal.</SummaryText>
                    <ResultsGrid>
                        <ResultItem $variant="loss">
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Emagrecer</p>
                            <CalorieValue>{results.loss}</CalorieValue>
                            <p style={{ fontSize: '0.75rem' }}>kcal por dia</p>
                        </ResultItem>
                        <ResultItem $variant="maintenance">
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Manter Peso</p>
                            <CalorieValue>{results.maintenance}</CalorieValue>
                            <p style={{ fontSize: '0.75rem' }}>kcal por dia</p>
                        </ResultItem>
                        <ResultItem $variant="gain">
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Ganhar Peso</p>
                            <CalorieValue>{results.gain}</CalorieValue>
                            <p style={{ fontSize: '0.75rem' }}>kcal por dia</p>
                        </ResultItem>
                    </ResultsGrid>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                            Taxa Metabólica Basal (TMB): <strong>{results.bmr} kcal</strong>
                        </p>
                    </div>
                </ResultsWrapper>
            )}
        </Card>
    );
}
