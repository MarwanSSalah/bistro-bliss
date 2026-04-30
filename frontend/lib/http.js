import { NextResponse } from 'next/server';

export function jsonOk(data, init = {}) {
  return NextResponse.json(data, init);
}

export function badRequest(message = 'Bad Request') {
  return NextResponse.json({ error: 'BAD_REQUEST', message }, { status: 400 });
}

export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json({ error: 'UNAUTHORIZED', message }, { status: 401 });
}

export function forbidden(message = 'Forbidden') {
  return NextResponse.json({ error: 'FORBIDDEN', message }, { status: 403 });
}

export function notFound(message = 'Not Found') {
  return NextResponse.json({ error: 'NOT_FOUND', message }, { status: 404 });
}

export function serverError(message = 'Internal Server Error') {
  return NextResponse.json({ error: 'INTERNAL', message }, { status: 500 });
}


