'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background-color: white;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ResultItem = styled.div<{ $highlight?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $highlight, theme }) => ($highlight ? theme.colors.primary + '15' : theme.colors.surface)};
  border: 1px solid ${({ $highlight, theme }) => ($highlight ? theme.colors.primary : theme.colors.border)};
  text-align: center;
`;

const CalorieValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export default function CaloriasCalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('1.2');
    const [results, setResults] = useState<{ maintenance: number; loss: number; gain: number } | null>(null);

    const calculateTDEE = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);

        if (w > 0 && h > 0 && a > 0) {
            // BMR (Mifflin-St Jeor)
            let bmr = 10 * w + 6.25 * h - 5 * a;
            bmr = gender === 'male' ? bmr + 5 : bmr - 161;

            const tdee = bmr * parseFloat(activity);

            setResults({
                maintenance: Math.round(tdee),
                loss: Math.round(tdee - 500),
                gain: Math.round(tdee + 500),
            });
        }
    };

    return (
        <Card>
            <Form>
                <FormGroup>
                    <Label>Sexo</Label>
                    <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Idade</Label>
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
                    <Label>Nível de Atividade</Label>
                    <Select value={activity} onChange={(e) => setActivity(e.target.value)}>
                        <option value="1.2">Sedentário (pouco ou nenhum exercício)</option>
                        <option value="1.375">Levemente ativo (1-3 dias/semana)</option>
                        <option value="1.55">Moderadamente ativo (3-5 dias/semana)</option>
                        <option value="1.725">Muito ativo (6-7 dias/semana)</option>
                        <option value="1.9">Extremamente ativo (atleta, trabalho físico)</option>
                    </Select>
                </FormGroup>
            </Form>

            <Button onClick={calculateTDEE} fullWidth>Calcular Calorias</Button>

            {results && (
                <ResultsGrid>
                    <ResultItem>
                        <p style={{ fontSize: '0.875rem' }}>Manutenção</p>
                        <CalorieValue>{results.maintenance}</CalorieValue>
                        <p style={{ fontSize: '0.75rem' }}>kcal/dia</p>
                    </ResultItem>
                    <ResultItem $highlight>
                        <p style={{ fontSize: '0.875rem' }}>Emagrecimento</p>
                        <CalorieValue>{results.loss}</CalorieValue>
                        <p style={{ fontSize: '0.75rem' }}>-500 kcal/dia</p>
                    </ResultItem>
                    <ResultItem>
                        <p style={{ fontSize: '0.875rem' }}>Ganho de Peso</p>
                        <CalorieValue>{results.gain}</CalorieValue>
                        <p style={{ fontSize: '0.75rem' }}>+500 kcal/dia</p>
                    </ResultItem>
                </ResultsGrid>
            )}
        </Card>
    );
}
